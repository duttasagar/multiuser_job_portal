import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

import {
  getNotifications,
  markNotificationRead,
} from "../../services/notificationService";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();

      setNotifications(data);

      // Mark all unread notifications as read
      await Promise.all(
        data.filter((n) => !n.is_read).map((n) => markNotificationRead(n.id)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <FaBell className="text-blue-600 text-2xl" />

          <h2 className="text-2xl font-bold">Notifications</h2>
        </div>

        {notifications.length === 0 ? (
          <p className="text-gray-500">No Notifications</p>
        ) : (
          notifications.map((item) => (
            <div key={item.id} className="border-b py-4">
              <h3 className="font-semibold">{item.title}</h3>

              <p className="text-gray-600">{item.message}</p>

              <p className="text-sm text-gray-400 mt-2">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
