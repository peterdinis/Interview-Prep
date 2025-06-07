import { FC } from "react";
import {Target} from "lucide-react"
import { Button } from "../ui/button";

const Navigation: FC = () => {
    return (
       <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-primary to-secondary p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Interview Prep
              </h1>
            </div>
            <Button className="rounded-lg">
              Sign In
            </Button>
          </div>
        </div>
      </header>
    )
}

export default Navigation