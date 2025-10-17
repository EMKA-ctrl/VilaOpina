import { PieChart } from '@mui/x-charts/PieChart';
interface SemiDonutProps{
    siPercentage: number;
    
}

function SemiDonut({ siPercentage }: SemiDonutProps){

    return(
        <PieChart 
            width={300}
            height={300}
            series={[
                {
                data: [{ id: 0, value: siPercentage, color: 'green' },{ id: 1, value: 100-siPercentage, color: 'red' }],
                arcLabel:'value',
                innerRadius: 30,
                outerRadius: 60,
                paddingAngle: 3,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 90,
                cx: 150,
                cy: 150,
                }
            ]}
        />
    )

}
export default SemiDonut;