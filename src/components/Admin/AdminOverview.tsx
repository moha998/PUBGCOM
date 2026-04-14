import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Settings2, 
  Trophy, 
  Eye, 
  TrendingUp, 
  Plus, 
  ArrowUpRight,
  ClipboardList
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// بيانات تجريبية لمحاكاة الواقع
const data = [
  { name: 'السبت', users: 400, copies: 240 },
  { name: 'الأحد', users: 300, copies: 139 },
  { name: 'الاثنين', users: 200, copies: 980 },
  { name: 'الثلاثاء', users: 278, copies: 390 },
  { name: 'الأربعاء', users: 189, copies: 480 },
  { name: 'الخميس', users: 239, copies: 380 },
  { name: 'الجمعة', users: 349, copies: 430 },
];

const StatCard = ({ title, value, icon: Icon, trend }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-bg-card border border-white/5 p-6 rounded-2xl"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-primary/10 rounded-xl text-primary">
        <Icon size={24} />
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </span>
    </div>
    <h3 className="text-text-muted text-sm mb-1">{title}</h3>
    <p className="text-2xl font-black text-white">{value}</p>
  </motion.div>
);

const AdminOverview = () => {
  return (
    <div className="p-8 space-y-8 bg-bg-dark min-h-screen text-right" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white">لوحة التحكم</h1>
          <p className="text-text-muted">أهلاً بك يا مهندس، إليك ملخص أداء ببجيكوم اليوم.</p>
        </div>
        <button className="bg-primary hover:bg-primary-hover text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
          <Plus size={20} />
          إضافة محتوى جديد
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي اللاعبين" value="12,450" icon={Users} trend={12} />
        <StatCard title="أكواد الحساسية" value="842" icon={Settings2} trend={5} />
        <StatCard title="المسابقات النشطة" value="3" icon={Trophy} trend={0} />
        <StatCard title="زيارات الموقع" value="45.2K" icon={Eye} trend={18} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-bg-card border border-white/5 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" />
              نشاط المستخدمين والأكواد
            </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#A0AEC0" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#A0AEC0" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#15191C', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#D4AF37' }}
                />
                <Area type="monotone" dataKey="users" stroke="#D4AF37" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Actions List */}
        <div className="bg-bg-card border border-white/5 p-6 rounded-2xl">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
            <ClipboardList size={18} className="text-primary" />
            آخر التفاعلات
          </h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-0">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <Users size={16} className="text-text-muted" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">لاعب جديد قام بالتسجيل</p>
                  <p className="text-xs text-text-muted">منذ 5 دقائق</p>
                </div>
                <ArrowUpRight size={14} className="text-text-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
