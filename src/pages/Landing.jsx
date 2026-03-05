import { Link } from 'react-router-dom';
import { Code2, Video, LineChart, ArrowRight } from 'lucide-react';

export default function Landing() {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            {/* Navbar placeholder */}
            <header className="py-4 px-6 md:px-12 flex justify-between items-center bg-white shadow-sm font-sans z-10 block relative">
                <div className="text-2xl font-bold text-primary-500">Placement Prep</div>
                <nav className="gap-6 hidden md:flex items-center">
                    <Link to="/features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Features</Link>
                    <Link to="/pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Pricing</Link>
                    <Link to="/dashboard" className="px-5 py-2.5 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
                        Get Started
                    </Link>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="flex-1">
                <section className="bg-gray-50 py-24 px-6 md:px-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-slate-100/[0.04] bg-[size:40px_40px]"></div>
                    <div className="max-w-4xl mx-auto relative relative z-10">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
                            Ace Your Placement
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/dashboard"
                                className="w-full sm:w-auto px-8 py-4 bg-primary-500 text-white text-lg rounded-xl font-bold font-semibold hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex justify-center items-center group"
                            >
                                Get Started
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/demo"
                                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 text-lg rounded-xl font-semibold hover:bg-gray-50 transition-all"
                            >
                                Watch Demo
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-24 px-6 md:px-12 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Everything you need to succeed</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                    <Code2 className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Practice Problems</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Master coding skills with our curated collection of industry-standard algorithmic challenges.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                                    <Video className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Mock Interviews</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Simulate real interview scenarios with peer-to-peer and AI-driven video mock interviews.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                                    <LineChart className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Track Progress</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Monitor your learning curve with detailed analytics, performance metrics, and skill gap analysis.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-xl font-bold">Placement Prep</div>
                    <div className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
