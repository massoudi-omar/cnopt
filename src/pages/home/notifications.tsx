import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useTheme } from "../../ctx/ThemeContext";
import { API } from "../../services/api";
import { useAuth } from "../../ctx/AuthContext";
import { useToast } from "../../ctx/ToastContext";
import { nodataImage } from "../../helpers/config";

type Notification = {
  id: number;
  cnopt: string;
  body: string;
};

// Notification Card
function NotificationCard({
  notification,
  onDelete,
}: {
  notification: Notification;
  onDelete: (id: number) => void;
}) {
  const { theme } = useTheme();

  return (
    <div
      className="flex justify-between items-start p-6 rounded-xl shadow-md hover:shadow-lg transition gap-4"
      style={{
        background: theme.colors.secondaryBackground,
        color: theme.colors.text,
      }}
    >
      <div>
        <h3
          className="font-semibold text-lg"
          style={{ color: theme.colors.primary }}
        >
          {notification.cnopt}
        </h3>
        <p className="mt-1" style={{ color: theme.colors.background }}>
          {notification.body}
        </p>
      </div>
      <button
        onClick={() => onDelete(notification.id)}
        title="Supprimer"
        style={{ color: theme.colors.primary }}
        className="hover:opacity-80 transition"
      >
        <FiTrash2 size={20} />
      </button>
    </div>
  );
}

// Main Notifications Component
export default function Notifications() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await API.notification.list(user.NumeroInscription);
      // Map API data to Notification[]
      const mapped: Notification[] = res.map((item: any) => {
        let parsedData;
        try {
          parsedData = JSON.parse(item.data);
        } catch {
          parsedData = {};
        }

        return {
          id: item.ID,
          cnopt: "CNOPT",
          body: `${item.content} (Année: ${parsedData.DateDemande?.split("-")[0] || ""})`,
        };
      });
      setNotifications(mapped);
    } catch (err) {
      console.error(err);
      showToast("Erreur lors du chargement des notifications", "warning");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Delete notification
  const handleDelete = async (id: number) => {
    try {
      let data = { ID: id };
      await API.notification.delete(data);

      setNotifications((prev) => prev.filter((n) => n.id !== id));

      showToast("Notification supprimée avec succès", "success");
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      showToast("Impossible de supprimer la notification", "warning");
    }
  };

  return (
    <div className="mx-auto">
      {loading && (
        <p className="text-center mb-4" style={{ color: theme.colors.primary }}>
          Chargement des notifications...
        </p>
      )}

      <div className="flex flex-col gap-4">
        {notifications.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-12 opacity-80">
            <img
              src={nodataImage}
              alt="No notifications"
              className="w-40 h-40 object-contain mb-4"
            />

          </div>
        ) : (
          notifications.map((n) => (
            <NotificationCard
              key={n.id}
              notification={n}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
