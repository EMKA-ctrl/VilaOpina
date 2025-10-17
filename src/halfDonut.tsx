import { PieChart } from '@mui/x-charts/PieChart';

function SemiDonut(){

    return(
        <PieChart 
            width={300}
            height={300}
            series={[
                {
                data: [{ id: 0, value: 50, color: 'green' },{ id: 1, value: 50, color: 'red' }],
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