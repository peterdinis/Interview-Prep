"use client";

import { useState } from "react";

export function useUpgradeToPro() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const upgrade = async () => {
		setLoading(true);
		setError(null);

		try {
			const res = await fetch("/api/payments/checkout", {
				method: "POST",
			});

			const data = await res.json();

			if (data?.url) {
				window.location.href = data.url;
			} else {
				setError("Chyba pri načítaní checkout URL.");
			}
		} catch (err: any) {
			console.error("Upgrade failed:", err);
			setError("Nepodarilo sa spustiť upgrade.");
		} finally {
			setLoading(false);
		}
	};

	return {
		upgrade,
		loading,
		error,
	};
}