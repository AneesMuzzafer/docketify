import { ScrollView, StyleSheet, View } from "react-native";
import { Button, DataTable, List, RadioButton, Text } from "react-native-paper";
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React from "react";
import DropDown from "react-native-paper-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from "react-redux";
import { diff_hours, vendorList } from "../utils/Utils";


const getReportTickets = (tickets, type, reportConfig) => {
    let filteredTickets = filteredTickets = tickets.filter(t => new Date(t.startAt).getTime() > new Date(reportConfig.startAt).getTime() && new Date(t.endAt).getTime() < new Date(reportConfig.endAt).getTime());

    if (type === "Link") {
        if (reportConfig.link === "all") {
            return (filteredTickets);
        } else {
            return (filteredTickets.filter(f => f.link === reportConfig.link));
        }

    } else {
        if (reportConfig.vendor === "all") {
            return (filteredTickets);
        } else {
            return (filteredTickets.filter(f => f.vendorId === reportConfig.vendor));
        }
    }
}

const Report = () => {
    const [reportConfig, setReportConfig] = React.useState({
        link: "all",
        vendor: "all",
        startAt: new Date(),
        endAt: new Date()
    });

    const [type, setType] = React.useState("Link");
    const [showDropDown, setShowDropDown] = React.useState(false);
    const [err, setErr] = React.useState("");

    const links = useSelector((state) => state.links.links);
    const tickets = useSelector((state) => state.tickets.tickets);

    const _links = links.map(l => ({ label: l.name, value: l.id }));
    const linkList = [{ label: "All", value: "all" }, ..._links];

    const vendorListAll = [{ label: "All", value: "all" }, ...vendorList];

    const [isStart, setIsStart] = React.useState(true);
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    const formatData = (tickets) => {
        return tickets.map((t, i) => {
            return {
                "No": i,
                "Link": links.find(l => l.id === t.link).name,
                "CP Number": links.find(l => l.id === t.link).cp,
                "Vendor": vendorList.find(v => v.value === t.vendorId).label,
                "Ticket started at": new Date(t.startAt).toLocaleString(),
                "Ticket ended at": new Date(t.endAt).toLocaleString(),
                "Total Downtime (Hours)": diff_hours(new Date(t.endAt), new Date(t.startAt)),
            }
        });
    }

    const onChange = (_, selectedDate) => {
        setShow(false);
        isStart ? setReportConfig({ ...reportConfig, startAt: selectedDate }) : setReportConfig({ ...reportConfig, endAt: selectedDate });
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = (entity) => {
        entity === "start" ? setIsStart(true) : setIsStart(false);
        showMode('date');
    };

    const showTimepicker = (entity) => {
        entity === "start" ? setIsStart(true) : setIsStart(false);
        showMode('time');
    };

    const reportTickets = formatData(getReportTickets(tickets, type, reportConfig));

    const handleDownload = async () => {
        if (reportTickets.length === 0) {
            setErr("No Tickets in this configuration");
            setTimeout(() => {
                setErr("");
            }, 2000)
            return;
        }

        const ws = XLSX.utils.json_to_sheet(reportTickets);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Report");
        const wbout = XLSX.write(wb, {
            type: 'base64',
            bookType: "xlsx"
        });
        const uri = FileSystem.cacheDirectory + 'cities.xlsx';
        await FileSystem.writeAsStringAsync(uri, wbout, {
            encoding: FileSystem.EncodingType.Base64
        });

        await Sharing.shareAsync(uri, {
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            dialogTitle: 'MyWater data',
            UTI: 'com.microsoft.excel.xlsx'
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={{marginBottom: 10}}><Text variant="titleMedium">Mode</Text></View>
                <RadioButton.Group onValueChange={val => setType(val)} value={type}>
                    <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
                        <RadioButton value="Link" />
                        <Text>Link</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
                        <RadioButton value="Vendor" />
                        <Text>Vendor</Text>
                    </View>
                </RadioButton.Group>
                <View style={{ marginTop: 20, marginBottom: 10, paddingTop: 10,  }}><Text variant="titleMedium">Configuration</Text></View>

                <View style={{ display: "flex", flex: 1, flexDirection: "column", gap: 20 }}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
                        <Text style={{ width: 100 }}>{type}</Text>
                        <View style={{ flex: 1 }}>
                            {
                                type === "Link" ?
                                    <DropDown
                                        label={`Select ${type}`}
                                        mode={"outlined"}
                                        visible={showDropDown}
                                        showDropDown={() => setShowDropDown(true)}
                                        onDismiss={() => setShowDropDown(false)}
                                        value={reportConfig.link}
                                        setValue={(e) => setReportConfig((p) => ({ ...p, link: e }))}
                                        list={linkList}
                                    /> :
                                    <DropDown
                                        label={`Select ${type}`}
                                        mode={"outlined"}
                                        visible={showDropDown}
                                        showDropDown={() => setShowDropDown(true)}
                                        onDismiss={() => setShowDropDown(false)}
                                        value={reportConfig.vendor}
                                        setValue={(e) => setReportConfig((p) => ({ ...p, vendor: e }))}
                                        list={vendorListAll}
                                    />
                            }
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
                        <Text style={{ width: 100 }}>Start Date</Text>
                        <View style={{ flex: 1, display: "flex", flexDirection: "row", borderStyle: "solid", borderWidth: 1, borderColor: "#938f97", borderRadius: 4, height: 50, alignItems: "center" }}>
                            <Button onPress={() => showDatepicker("start")}>{reportConfig.startAt?.toLocaleDateString()}</Button>
                            <Text> | </Text>
                            <Button onPress={() => showTimepicker("start")}>{reportConfig.startAt?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Button>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
                        <Text style={{ width: 100 }}>End Date</Text>
                        <View style={{ flex: 1, display: "flex", flexDirection: "row", borderStyle: "solid", borderWidth: 1, borderColor: "#938f97", borderRadius: 4, height: 50, alignItems: "center" }}>
                            <Button onPress={() => showDatepicker("end")}>{reportConfig.endAt?.toLocaleDateString()}</Button>
                            <Text> | </Text>
                            <Button onPress={() => showTimepicker("end")}>{reportConfig.endAt?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Button>
                        </View>
                    </View>
                </View>
                {
                    err && <Text style={{ paddingTop: 10, paddingBottom: 10, color: "red", fontStyle: "italic" }}>{err}</Text>
                }
                <View style={{ marginTop: 20, paddingTop: 10 }}><Text variant="titleMedium">Tickets</Text></View>
                {
                    reportTickets.map((t, i) => (
                        <List.Item key={t.No}
                            style={{ borderBottomColor: "#f3edf6", borderBottomWidth: 0.5 }}
                            title={t.Link}
                            description={t["Total Downtime (Hours)"] + " Hours - (" + t.Vendor + ")"}
                        />

                    ))
                }
            </ScrollView>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={isStart ? reportConfig.startAt : reportConfig.endAt}
                    mode={mode}
                    is24Hour={false}
                    onChange={onChange}
                />
            )}

            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: 20, marginTop: 10 }}>
                <Button icon="export" mode="contained" style={{ width: "70%" }} onPress={handleDownload}>Export Excel</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
});

export default Report;
