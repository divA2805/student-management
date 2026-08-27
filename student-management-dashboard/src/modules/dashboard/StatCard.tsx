"use client";

interface StatCardProps {
    title: string;
    value: string | number;
}

export default function StatCard({
    title,
    value,
}: StatCardProps) {
    return (
        <div className="stat-card">
            <div className="stat-card-title">
                {title}
            </div>

            <div className="stat-card-value">
                {value}
            </div>
        </div>
    );
}