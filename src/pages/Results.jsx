import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { getAnalysisById } from '../lib/analyzer';
import {
    CheckCircle2,
    Calendar,
    Lightbulb,
    ChevronRight,
    Target,
    Award,
    Clock,
    ArrowLeft
} from 'lucide-react';

export default function Results() {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const result = getAnalysisById(id);
        setData(result);
    }, [id]);

    if (!data) return <div className="p-8 text-center">Loading analysis...</div>;

    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (data.readinessScore / 100) * circumference;

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <Link to="/dashboard/history" className="flex items-center text-primary-500 hover:text-primary-600 font-medium">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to History
                </Link>
                <div className="text-sm text-gray-500">
                    Analyzed on {new Date(data.createdAt).toLocaleDateString()}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Summary */}
                <div className="lg:col-span-1 space-y-8">
                    <Card className="bg-gradient-to-br from-primary-600 to-indigo-700 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Award className="w-32 h-32" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-white opacity-90">Readiness Score</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center pb-8">
                            <div className="relative w-40 h-40 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="80" cy="80" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="transparent" />
                                    <circle
                                        cx="80" cy="80" r="45" stroke="white" strokeWidth="8" fill="transparent"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-5xl font-bold">{data.readinessScore}</span>
                                    <span className="text-sm opacity-70">/100</span>
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <h3 className="text-xl font-bold">{data.company}</h3>
                                <p className="opacity-80">{data.role}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="w-5 h-5 text-primary-500" /> Extracted Skills
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {Object.entries(data.extractedSkills).map(([cat, skills]) => (
                                <div key={cat}>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{cat}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map(s => (
                                            <span key={s} className="px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Roadmap & Questions */}
                <div className="lg:col-span-2 space-y-8">
                    {/* 7-Day Plan */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary-500" /> 7-Day Strategy
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.plan.map((p, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-md transition-all">
                                        <div className="w-20 font-bold text-primary-500">{p.day}</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{p.task}</h4>
                                            <p className="text-sm text-gray-500">{p.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Interview Questions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5 text-yellow-500" /> Top 10 Practice Questions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {data.questions.map((q, i) => (
                                        <div key={i} className="flex gap-3 p-3 rounded-lg border border-gray-100 bg-white hover:border-primary-200 transition-colors">
                                            <span className="text-primary-300 font-bold">{i + 1}</span>
                                            <p className="text-sm text-gray-700 font-medium">{q}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Checklists */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-500" /> Round-wise Preparation
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {data.checklist.map((round, i) => (
                                    <div key={i}>
                                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs">{i + 1}</span>
                                            {round.round}
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-8">
                                            {round.items.map((item, j) => (
                                                <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
