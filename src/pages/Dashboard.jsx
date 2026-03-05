export default function Dashboard() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Practice Progress</h3>
                    <p className="text-3xl font-bold text-primary-500">24/150</p>
                    <p className="text-sm text-gray-500 mt-1">Problems solved</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upcoming Assessments</h3>
                    <p className="text-3xl font-bold text-primary-500">2</p>
                    <p className="text-sm text-gray-500 mt-1">Due this week</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Technical Score</h3>
                    <p className="text-3xl font-bold text-primary-500">85%</p>
                    <p className="text-sm text-gray-500 mt-1">Top 15% of peers</p>
                </div>
            </div>
        </div>
    );
}
