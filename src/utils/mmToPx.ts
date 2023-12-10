const getDeviceDPI = () => {
    return (window.devicePixelRatio || 1) * 72;
};

export default function mmToPx(mm: number, dpi = getDeviceDPI()) {
    return (mm * dpi) / 25.4;
}
