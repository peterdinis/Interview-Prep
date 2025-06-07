import { FC } from "react";
import { Award, Target, TrendingUp, Clock } from "lucide-react";

const stats = [
    { number: '50K+', label: 'Successful Interviews', icon: Award },
    { number: '1000+', label: 'Practice Questions', icon: Target },
    { number: '98%', label: 'Success Rate', icon: TrendingUp },
    { number: '24/7', label: 'Available Practice', icon: Clock }
];

const StatsSection: FC = () => {
    return (
        <section className="relative py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center group"
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                                <stat.icon className="h-8 w-8 text-white/80 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                                <div className="text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                                    {stat.number}
                                </div>
                                <div className="text-blue-100 font-medium">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default StatsSection