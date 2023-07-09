export const vendorList = [
    {
        label: "Sanguine",
        value: "Sanguine",
    },
    {
        label: "STPL",
        value: "STPL",
    },
    {
        label: "SNTPL",
        value: "SNTPL",
    },
];

export const diff_hours = (dt2, dt1) => {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    const res = diff.toFixed(2);
    return res;
}
