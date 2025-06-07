import { Zap, ArrowRight, Play } from "lucide-react";
import { FC } from "react";
import { Button } from "../ui/button";

const HeroSection: FC = () => {
    return (
        <>
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-fade-in-up">
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 border border-foreground-200 rounded-full text-sm font-medium text-primary mb-8 animate-bounce-subtle">
                                <Zap className="h-4 w-4 mr-2" />
                                Join 50,000+ developers who aced their interviews
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                                Master Your
                                <br />
                                <span className="bg-gradient-to-r from-primary via-secondary to-foreground bg-clip-text text-transparent animate-gradient">
                                    Tech Interviews
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
                                Practice with AI-powered mock interviews, get real-time feedback, and land your dream job.
                                The most comprehensive interview preparation platform for developers.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <Button
                                    size="lg"
                                >
                                    Start Practicing Free
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                >
                                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                    Watch Demo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection