import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface EngagementData {
  category: string;
  views: number;
  likes: number;
  comments: number;
}

interface EngagementChartProps {
  data: EngagementData[];
}

function EngagementChart({ data }: EngagementChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300">
        <CardHeader className="px-4 md:px-6 py-3 md:py-6">
          <CardTitle className="text-gray-900 text-base md:text-lg">
            Engagement by Category
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 md:px-6">
          <ResponsiveContainer
            width="100%"
            height={250}
            className="md:!h-[300px]"
          >
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis
                dataKey="category"
                stroke="#6b7280"
                tick={{ fill: "#6b7280", fontSize: 11 }}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis
                stroke="#6b7280"
                tick={{ fill: "#6b7280", fontSize: 11 }}
              />
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
                formatter={(value) => (
                  <span className="text-gray-700 text-xs md:text-sm">
                    {value}
                  </span>
                )}
                wrapperStyle={{ fontSize: "12px" }}
              />
              <Bar
                dataKey="views"
                fill="#06B6D4"
                radius={[4, 4, 0, 0]}
                animationBegin={0}
                animationDuration={800}
              />
              <Bar
                dataKey="likes"
                fill="#EC4899"
                radius={[4, 4, 0, 0]}
                animationBegin={100}
                animationDuration={800}
              />
              <Bar
                dataKey="comments"
                fill="#A855F7"
                radius={[4, 4, 0, 0]}
                animationBegin={200}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default EngagementChart;
