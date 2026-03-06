import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import {
    CheckCircle2,
    Circle,
    Link as LinkIcon,
    Github,
    Globe,
    Copy,
    Check,
    AlertCircle,
    Award,
    Trophy,
    ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const STEPS = [
    { id: '01', label: 'Landing & Hero UI', path: '/' },
    { id: '02', label: 'Dashboard Overview', path: '/dashboard' },
    { id: '03', label: 'Skills Analysis Engine', path: '/dashboard/analyzer' },
    { id: '04', label: '7-Day Plan Generation', path: '/results/latest' },
    { id: '05', label: 'History & Persistence', path: '/dashboard/history' },
    { id: '06', label: 'Resources & Profile', path: '/dashboard/resources' },
    { id: '07', label: 'Hardening & Tests', path: '/prp/07-test' },
    { id: '08', label: 'Ship Lock Active', path: '/prp/08-ship' }
];

export default function Proof() {
    const [submission, setSubmission] = useState(() => {
        const saved = localStorage.getItem('prp_final_submission');
        return saved ? JSON.parse(saved) : { lovable: '', github: '', deploy: '' };
    });

    const [testChecklist, setTestChecklist] = useState(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        return saved ? JSON.parse(saved) : {};
    });

    const [copied, setCopied] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        localStorage.setItem('prp_final_submission', JSON.stringify(submission));
    }, [submission]);

    const validateUrl = (url) => {
        try {
            const parsed = new URL(url);
            return parsed.protocol === "http:" || parsed.protocol === "https:";
        } catch (_) {
            return false;
        }
    };

    const handleInputChange = (field, value) => {
        setSubmission(prev => ({ ...prev, [field]: value }));
        if (value && !validateUrl(value)) {
            setErrors(prev => ({ ...prev, [field]: 'Invalid URL' }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const testsPassed = Object.values(testChecklist).filter(Boolean).length === 10;
    const linksValid = validateUrl(submission.lovable) && validateUrl(submission.github) && validateUrl(submission.deploy);

    // For the "8 steps", we'll check if they are functionally 'complete' 
    // Step 07 is linked to our checklist. The others we assume true if the user is here.
    const stepsStatus = STEPS.map(step => ({
        ...step,
        completed: step.id === '07' ? testsPassed : true
    }));

    const allStepsDone = stepsStatus.every(s => s.completed);
    const isShipped = allStepsDone && testsPassed && linksValid;

    const copySubmission = () => {
        const text = `
------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${submission.lovable}
GitHub Repository: ${submission.github}
Live Deployment: ${submission.deploy}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------
        `.trim();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Status Header */}
                <div className={`p-8 rounded-[40px] shadow-2xl transition-all duration-500 border-2 ${isShipped
                        ? 'bg-primary-500 border-primary-400 text-white shadow-primary-500/20'
                        : 'bg-white border-gray-100 text-gray-900 shadow-gray-200/50'
                    }`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 ${isShipped ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                                }`}>
                                Project Status: {isShipped ? 'Shipped' : 'In Progress'}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                                Proof of Work
                            </h1>
                            <p className={`mt-2 font-medium opacity-70 ${isShipped ? 'text-primary-50' : 'text-gray-500'}`}>
                                Verification and final project submission system.
                            </p>
                        </div>
                        <div className="relative">
                            {isShipped ? (
                                <Trophy className="w-20 h-20 text-white drop-shadow-lg" />
                            ) : (
                                <div className="w-20 h-20 rounded-full border-4 border-dashed border-gray-200 flex items-center justify-center">
                                    <Award className="w-10 h-10 text-gray-300" />
                                </div>
                            )}
                        </div>
                    </div>

                    {isShipped && (
                        <div className="mt-8 pt-8 border-t border-white/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <p className="text-2xl font-black italic leading-tight">
                                "You built a real product.<br />
                                Not a tutorial. Not a clone.<br />
                                A structured tool that solves a real problem.<br /><br />
                                This is your proof of work."
                            </p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Steps Overview */}
                    <Card className="border-none shadow-xl shadow-gray-200/50 rounded-[32px] overflow-hidden">
                        <CardHeader className="bg-gray-50/50">
                            <CardTitle className="text-lg font-black flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-primary-500" /> Step Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-100">
                                {stepsStatus.map((step) => (
                                    <div key={step.id} className="flex items-center justify-between p-4 px-6 hover:bg-gray-50/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-black text-gray-300">{step.id}</span>
                                            <span className="text-sm font-bold text-gray-700">{step.label}</span>
                                        </div>
                                        {step.completed ? (
                                            <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md uppercase tracking-tighter">Completed</span>
                                        ) : (
                                            <span className="text-[10px] font-black text-amber-500 bg-amber-50 px-2 py-1 rounded-md uppercase tracking-tighter">Pending</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Artifact Inputs */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-xl shadow-gray-200/50 rounded-[32px]">
                            <CardHeader>
                                <CardTitle className="text-lg font-black flex items-center gap-2">
                                    <LinkIcon className="w-5 h-5 text-primary-500" /> Artifact Inputs
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5 px-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                                        <Circle className="w-2 h-2 fill-primary-500" /> Lovable Project URL
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="https://lovable.dev/projects/..."
                                            value={submission.lovable}
                                            onChange={(e) => handleInputChange('lovable', e.target.value)}
                                            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white outline-none transition-all text-sm font-semibold ${errors.lovable ? 'border-red-300 focus:ring-red-100' : 'border-gray-100 focus:ring-primary-100 ring-2 ring-transparent focus:ring-2'
                                                }`}
                                        />
                                        {validateUrl(submission.lovable) && <Check className="absolute right-3 top-3.5 w-4 h-4 text-emerald-500" />}
                                    </div>
                                    {errors.lovable && <p className="text-[10px] text-red-500 font-bold">{errors.lovable}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                                        <Github className="w-3 h-3" /> GitHub Repository
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="https://github.com/user/repo"
                                            value={submission.github}
                                            onChange={(e) => handleInputChange('github', e.target.value)}
                                            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white outline-none transition-all text-sm font-semibold ${errors.github ? 'border-red-300 focus:ring-red-100' : 'border-gray-100 focus:ring-primary-100 ring-2 ring-transparent focus:ring-2'
                                                }`}
                                        />
                                        {validateUrl(submission.github) && <Check className="absolute right-3 top-3.5 w-4 h-4 text-emerald-500" />}
                                    </div>
                                    {errors.github && <p className="text-[10px] text-red-500 font-bold">{errors.github}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                                        <Globe className="w-3 h-3" /> Deployed URL
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="https://your-site.vercel.app"
                                            value={submission.deploy}
                                            onChange={(e) => handleInputChange('deploy', e.target.value)}
                                            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white outline-none transition-all text-sm font-semibold ${errors.deploy ? 'border-red-300 focus:ring-red-100' : 'border-gray-100 focus:ring-primary-100 ring-2 ring-transparent focus:ring-2'
                                                }`}
                                        />
                                        {validateUrl(submission.deploy) && <Check className="absolute right-3 top-3.5 w-4 h-4 text-emerald-500" />}
                                    </div>
                                    {errors.deploy && <p className="text-[10px] text-red-500 font-bold">{errors.deploy}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Export Action */}
                        <button
                            onClick={copySubmission}
                            disabled={!isShipped}
                            className={`w-full py-5 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 transition-all ${isShipped
                                    ? 'bg-gray-900 text-white hover:bg-black shadow-xl shadow-gray-200 hover:-translate-y-1'
                                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                }`}
                        >
                            {copied ? (
                                <><Check className="w-5 h-5" /> Submission Copied!</>
                            ) : (
                                <><Copy className="w-5 h-5" /> Copy Final Submission</>
                            )}
                        </button>
                    </div>
                </div>

                {!isShipped && (
                    <div className="bg-amber-50 border border-amber-100 rounded-[32px] p-6 flex flex-col items-center text-center gap-4">
                        <AlertCircle className="w-10 h-10 text-amber-500" />
                        <div>
                            <h3 className="text-amber-900 font-black">Ship Verification Required</h3>
                            <p className="text-amber-800/70 text-sm font-medium">
                                You must complete the 10-point checklist at <Link to="/prp/07-test" className="underline font-black">/prp/07-test</Link> and provide all 3 artifact links to reach "Shipped" status.
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex justify-center">
                    <Link to="/prp/08-ship" className="text-gray-400 hover:text-gray-900 text-xs font-black uppercase tracking-widest flex items-center gap-2 group">
                        <ExternalLink className="w-3 h-3 group-hover:rotate-45 transition-transform" /> View Ship Status Layout
                    </Link>
                </div>
            </div>
        </div>
    );
}
