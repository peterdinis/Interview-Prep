import { FC } from "react";
import { Target } from "lucide-react";

const Footer: FC = () => {
    return (
        <footer className="py-16 relative overflow-hidden bg-white/80">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0 group">
              <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Target className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">InterviewPrep</span>
            </div>
            <div className="text-black text-lg">
              © 2025 InterviewPrep. All rights reserved. Made with ❤️ for developers.
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer