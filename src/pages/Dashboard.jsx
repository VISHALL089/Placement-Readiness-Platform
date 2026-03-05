import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';
import { Calendar, PlayCircle } from 'lucide-react';

const mockSkillData = [
    { subject: 'DSA', A: 75, fullMark: 100 },
    { subject: 'System Design', A: 60, fullMark: 100 },
    { subject: 'Communication', A: 80, fullMark: 100 },
    { subject: 'Resume', A: 85, fullMark: 100 },
    { subject: 'Aptitude', A: 70, fullMark: 100 },
];

export default function Dashboard() {
    const readinessScore = 72;
    const circumference = 2 * Math.PI * 45; // r=45
    const strokeDashoffset = circumference - (readinessScore / 100) * circumference;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Overall Readiness */}
                <Card className="flex flex-col justify-center items-center">
                    <CardHeader>
                        <CardTitle className="text-center text-lg text-gray-700">Overall Readiness</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center pb-8">
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            {/* Background Circle */}
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="45"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    className="text-gray-100"
                                />
                                {/* Progress Circle */}
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="45"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    className="text-primary-500 transition-all duration-1000 ease-out"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-gray-800">{readinessScore}</span>
                                <span className="text-sm text-gray-500">/100</span>
                            </div>
                        </div>
                        <p className="mt-4 font-medium text-gray-600">Readiness Score</p>
                    </CardContent>
                </Card>

                {/* Skill Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-700">Skill Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mockSkillData}>
                                    <PolarGrid stroke="#e5e7eb" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Student"
                                        dataKey="A"
                                        stroke="hsl(245, 58%, 51%)"
                                        fill="hsl(245, 58%, 51%)"
                                        fillOpacity={0.6}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Continue Practice */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-700">Continue Practice</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-lg">Dynamic Programming</h4>
                                    <p className="text-sm text-gray-500 mt-1">3/10 completed</p>
                                </div>
                                <div className="bg-primary-50 w-10 h-10 rounded-full flex items-center justify-center text-primary-500">
                                    <PlayCircle className="w-5 h-5" />
                                </div>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                            </div>

                            <button className="w-full py-2.5 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors">
                                Continue
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Weekly Goals & Upcoming Assessments */}
                <div className="space-y-6">

                    {/* Weekly Goals */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-gray-700">Weekly Goals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium text-gray-700">Problems Solved</span>
                                    <span className="text-gray-500">12/20 this week</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-6 px-2">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        <span className="text-xs text-gray-400 font-medium">{day}</span>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs 
                      ${[0, 1, 3].includes(i) ? 'bg-primary-500 text-white' : 'bg-gray-100 text-transparent'}`}
                                        >
                                            ✓
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Assessments */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-gray-700">Upcoming Assessments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="bg-orange-100 text-orange-600 p-2 rounded-md mt-0.5">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">DSA Mock Test</h4>
                                        <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="bg-blue-100 text-blue-600 p-2 rounded-md mt-0.5">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">System Design Review</h4>
                                        <p className="text-sm text-gray-500">Wed, 2:00 PM</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="bg-purple-100 text-purple-600 p-2 rounded-md mt-0.5">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">HR Interview Prep</h4>
                                        <p className="text-sm text-gray-500">Friday, 11:00 AM</p>
                                    </div>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
