import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface CategoryChartProps {
  data: CategoryData[];
}

function CategoryChart({ data }: CategoryChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300">
        <CardHeader className="px-4 md:px-6 py-3 md:py-6">
          <CardTitle className="text-gray-900 text-base md:text-lg">
            Category Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 md:px-6">
          <ResponsiveContainer
            width="100%"
            height={250}
            className="md:!h-[300px]"
          >
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  color: "#1a1a1a",
                  fontSize: "12px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-gray-700">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default CategoryChart;
