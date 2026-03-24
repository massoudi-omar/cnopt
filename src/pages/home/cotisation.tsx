import { useTheme } from "../../ctx/ThemeContext";
import AmountCard from "../../components/cotisation/AmountCard";
import TransactionItem from "../../components/cotisation/TransactionItem";
import InfoCard from "../../components/cotisation/InfoCard";
import SpecialCard from "../../components/cotisation/SpecialCard";
import modePaymentImg from "../../assets/images/mastercard.png";
import modePaymentImg2 from "../../assets/images/visa.png";
import { useEffect, useState } from "react";
import { API } from "../../services/api";
import { useAuth } from "../../ctx/AuthContext";

type CotisationAmount = {
  Actuel: number;
  AffecteTotal: number;
  PayeTotal: number;
};

export default function Cotisation() {
  const { theme } = useTheme();
  const { user } = useAuth();

  const [amount, setAmount] = useState<CotisationAmount | null>(null);
  const [Paye, setPaye] = useState<any>([]);
  const [Affecte, setAffecte] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedAffecte, setSelectedAffecte] = useState<any[]>([]);

  const formatTND = (val: number) => `${val.toLocaleString()} TND`;

  const fetchCotisation = async () => {
    try {
      if (!user) return;

      const data = await API.user.cotisation(user.NumeroInscription);

      setAmount({
        Actuel: data.Actuel,
        AffecteTotal: data.AffecteTotal,
        PayeTotal: data.PayeTotal,
      });

      setPaye([...data.Paye].reverse());

      const affecteWithoutTransaction = data?.Affecte
        ?.filter((item: any) => item.TransactionId === null)
        .reverse();

      setAffecte(affecteWithoutTransaction);
    } catch (err) {
      console.log("Cotisation fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCotisation();
  }, []);

  const cards = amount
    ? [
      { title: "Total Payé", value: amount.PayeTotal },
      { title: "Solde actuel de cotisations", value: amount.Actuel },
      { title: "Total affecté", value: amount.AffecteTotal },
    ]
    : [];

  const totalSelected = selectedAffecte.reduce(
    (sum, item) => sum + parseFloat(item.MontantCotisation),
    0
  );

  return (
    <div className="mx-auto w-full flex flex-col gap-8">
      {/* Top Amount Cards */}
      {/* Top Amount Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="h-28 rounded-2xl bg-gray-300 animate-pulse"
              />
            ))
          : cards.map((item, index) => (
            <AmountCard
              key={index}
              title={item.title}
              amount={formatTND(item.value)}
            />
          ))}
      </div>

      {/* Transaction History */}
      <div className="flex flex-col gap-6">
        {/* Transaction History */}
        <div
          className="rounded-xl p-3 sm:p-4 max-h-64 overflow-y-auto custom-scrollbar"
          style={{ background: theme.colors.secondaryBackground }}
        >
          {loading
            ? Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-12 rounded-lg bg-gray-300 mb-2 animate-pulse"
                />
              ))
            : Paye.map((item: any, index: number) => (
              <TransactionItem
                key={index}
                date={item.Date}
                transaction={item.ID}
                amount={item.Montant}
              />
            ))}
        </div>

        {/* Payment Button */}
        <div className="flex justify-center">
          <button
            className="sm:w-auto px-20 md:px-28 py-2 my-2 md:my-8 rounded-full font-semibold transition hover:shadow-md"
            style={{
              background: theme.colors.background,
              color: theme.colors.secondaryBackground,
            }}
            disabled={loading || Affecte.length === 0}
          >
            {loading ? "Loading..." : "Paiement"}
          </button>
        </div>

        {/* Bottom Cards */}
        {/* Bottom Cards */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 my-6">
          {loading ? (
            <>
              {/* Skeleton for InfoCard */}
              <div className="flex-1 h-40 rounded-2xl bg-gray-300 animate-pulse" />

              {/* Skeleton for SpecialCard */}
              <div className="flex-1 h-40 rounded-2xl bg-gray-300 animate-pulse" />
            </>
          ) : (
            <>
              <InfoCard
                title="Année de cotisation non payé"
                description="Il n'y a pas de cotisations impayées"
                data={Affecte}
                selected={selectedAffecte}
                setSelected={setSelectedAffecte}
              />
              <SpecialCard
                topButtonText="Mode de paiement"
                bottomButtonText="Passer au paiement"
                imageSrc={modePaymentImg}
                imageSrc2={modePaymentImg2}
                total={totalSelected}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}