"use client";

import { useState } from "react";
import { Plus, Edit2, Eye, EyeOff, Check, X, Shield, Sparkles } from "lucide-react";
import { createPlan, updatePlan, togglePlanActive } from "@/lib/actions/plan.actions";
import { toast } from "sonner";

interface PlanManagerClientProps {
  initialPlans: any[];
}

export default function PlanManagerClient({ initialPlans }: PlanManagerClientProps) {
  const [plans, setPlans] = useState(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [durationMonths, setDurationMonths] = useState(3);
  const [baseMonthlyPrice, setBaseMonthlyPrice] = useState(2199);
  const [discountPercentage, setDiscountPercentage] = useState(12);
  const [allowPartialPayment, setAllowPartialPayment] = useState(true);
  const [minUpfrontPercentage, setMinUpfrontPercentage] = useState(50);
  const [featuresText, setFeaturesText] = useState("");
  const [isPopular, setIsPopular] = useState(false);

  const openCreateModal = () => {
    setEditingPlan(null);
    setName("");
    setDescription("");
    setDurationMonths(3);
    setBaseMonthlyPrice(2499);
    setDiscountPercentage(10);
    setAllowPartialPayment(true);
    setMinUpfrontPercentage(50);
    setFeaturesText("All clubs access, Biometric assessment, Mobile app");
    setIsPopular(false);
    setIsModalOpen(true);
  };

  const openEditModal = (plan: any) => {
    setEditingPlan(plan);
    setName(plan.name);
    setDescription(plan.description);
    setDurationMonths(plan.durationMonths);
    setBaseMonthlyPrice(plan.baseMonthlyPrice);
    setDiscountPercentage(plan.discountPercentage || 0);
    setAllowPartialPayment(plan.allowPartialPayment ?? true);
    setMinUpfrontPercentage(plan.minUpfrontPercentage || 50);
    setFeaturesText(Array.isArray(plan.features) ? plan.features.join("\n") : "");
    setIsPopular(Boolean(plan.isPopular));
    setIsModalOpen(true);
  };

  const handleToggleActive = async (id: string) => {
    const res = await togglePlanActive(id);
    if (res.success) {
      setPlans((prev) =>
        prev.map((p) => (p._id === id ? { ...p, isActive: res.isActive } : p))
      );
      toast.success(res.isActive ? "Plan activated" : "Plan archived");
    } else {
      toast.error(res.error || "Failed to update plan status");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const features = featuresText
      .split(/[\n,]/)
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      name,
      description,
      durationMonths: Number(durationMonths),
      baseMonthlyPrice: Number(baseMonthlyPrice),
      discountPercentage: Number(discountPercentage),
      allowPartialPayment,
      minUpfrontPercentage: Number(minUpfrontPercentage),
      features,
      isPopular,
    };

    if (editingPlan) {
      const res = await updatePlan(editingPlan._id, payload);
      if (res.success) {
        setPlans((prev) =>
          prev.map((p) => (p._id === editingPlan._id ? res.plan : p))
        );
        toast.success("Plan updated successfully (Version incremented if price changed)");
        setIsModalOpen(false);
      } else {
        toast.error(res.error || "Failed to update plan");
      }
    } else {
      const res = await createPlan(payload);
      if (res.success) {
        setPlans((prev) => [...prev, res.plan]);
        toast.success("New subscription plan created");
        setIsModalOpen(false);
      } else {
        toast.error(res.error || "Failed to create plan");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-zinc-100">
            Plan Management
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Configure tiered fitness memberships, upfront installment rules, and snapshot versions.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs transition-all flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create New Plan
        </button>
      </div>

      {/* Plans List Table */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden shadow-lg backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/90 border-b border-zinc-800 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-3.5 px-4">Plan Name & Details</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Monthly Rate</th>
                <th className="py-3.5 px-4">Plan Discount</th>
                <th className="py-3.5 px-4">Partial Pay</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {plans.map((plan) => (
                <tr key={plan._id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-semibold text-zinc-200 flex items-center gap-2">
                      <span>{plan.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                        v{plan.version || 1}
                      </span>
                      {plan.isPopular && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-zinc-400 max-w-xs truncate mt-0.5">
                      {plan.description}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-zinc-300">
                    {plan.durationMonths} Month{plan.durationMonths > 1 ? "s" : ""}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-zinc-100">
                    ₹{plan.baseMonthlyPrice.toLocaleString("en-IN")}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-emerald-400">
                    {plan.discountPercentage}% OFF
                  </td>
                  <td className="py-4 px-4">
                    {plan.allowPartialPayment ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                        <Check className="w-3 h-3" /> Min {plan.minUpfrontPercentage}%
                      </span>
                    ) : (
                      <span className="text-[11px] text-zinc-400">Full Only</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full ${
                        plan.isActive
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {plan.isActive ? "Active" : "Archived"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(plan)}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors border border-zinc-700"
                        title="Edit Plan"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleToggleActive(plan._id)}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors border border-zinc-700"
                        title={plan.isActive ? "Archive Plan" : "Activate Plan"}
                      >
                        {plan.isActive ? (
                          <EyeOff className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 text-zinc-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-lg font-heading font-bold text-zinc-100">
                {editingPlan ? `Edit Plan (Version ${editingPlan.version || 1})` : "Create Subscription Plan"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">
                  Plan Display Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Athlete Pro Hypertrophy"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">
                  Plan Description / Tagline
                </label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive athletic access across all metro clubs."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">
                    Duration (Months)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={24}
                    required
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">
                    Base Monthly Price (₹)
                  </label>
                  <input
                    type="number"
                    min={100}
                    required
                    value={baseMonthlyPrice}
                    onChange={(e) => setBaseMonthlyPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">
                    Plan Discount (%)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={90}
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">
                    Min Upfront Installment (%)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={90}
                    value={minUpfrontPercentage}
                    onChange={(e) => setMinUpfrontPercentage(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowPartialPayment}
                    onChange={(e) => setAllowPartialPayment(e.target.checked)}
                    className="rounded accent-emerald-500"
                  />
                  <span className="text-zinc-300">Allow Partial Milestone Payment</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className="rounded accent-emerald-500"
                  />
                  <span className="text-zinc-300">Highlight as Popular</span>
                </label>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase tracking-wider text-[10px] font-semibold">
                  Features (one per line)
                </label>
                <textarea
                  rows={3}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Sauna & Cold Plunge access&#10;2 Monthly 1-on-1 coaching sessions&#10;DEXA scan included"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-semibold transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : editingPlan ? "Update Plan" : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
