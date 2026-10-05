import SubscriptionCard from "./SubscriptionCard"

function SubscriptionList({
  subscriptions,
  onEdit,
  onDelete,
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {subscriptions.map((subscription) => (
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default SubscriptionList