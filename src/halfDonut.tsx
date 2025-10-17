import { PieChart } from '@mui/x-charts/PieChart';

function SemiDonut(){

    return(
        <PieChart 
            width={300}
            height={300}
            series={[
                {
                data: [{ id: 0, value: 80, color: 'green' },{ id: 1, value: 20, color: 'red' }],
                arcLabel:'value',
                innerRadius: 30,
                outerRadius: 100,
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