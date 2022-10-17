const colorMap = {
    "kac-steel": "#abb4c3",
    "kac-steel-light": "#f3f3f4",
    "kac-steel-dark": "#65738b",
    "kac-iron": "#121b23",
    "kac-iron-light": "#23303d",
    "kac-iron-dark": "#090f15",
    "kac-blood": "#7b001d",
    "kac-blood-light": "#e3132c",
    "kac-blood-dark": "#541423",
    "kac-fire": "#f50000",
    "kac-fire-light": "#f88b00",
    "kac-fire-dark": "#950101",
    "kac-bone": "#ecb87b",
    "kac-bone-light": "#e4ceb3",
    "kac-bone-dark": "#a3835f",
    "kac-skin": "#f7adae",
    "kac-skin-light": "#f2ced1",
    "kac-skin-dark": "#e6848c",
    "kac-gold": "#ffd23b",
    "kac-gold-light": "#fff5c0",
    "kac-gold-dark": "#f59d20",
    "kac-cloth": "#5c77b2",
    "kac-cloth-light": "#80a0bc",
    "kac-cloth-dark": "#32497b",
    "kac-curse": "#f20170",
    "kac-curse-light": "#ff6883",
    "kac-curse-dark": "#c10045",
    "kac-monster": "#4ec342",
    "kac-monster-light": "#a4e9a4",
    "kac-monster-dark": "#1aa62b",
};
const colors = Object.keys(colorMap);

export default function ColorList() {
    return (
        <div className="flex flex-row flex-wrap gap-2 p-8 bg-white text-kac-iron rounded-md shadow-lg mb-2">
            {(Object.keys(colorMap) as (keyof typeof colorMap)[]).map((colorKey) => (
                <div key={colorKey} className={`flex flex-col gap-1 items-center`}>
                    <div className={`h-20 w-20`} style={{ backgroundColor: colorMap[colorKey] }}></div>
                    <div className="text-sm">{colorKey}</div>
                    <div className="text-sm">{colorMap[colorKey]}</div>
                </div>
            ))}
        </div>
    );
}
