import { SubscriptionTier } from "@/modules/defang/generated/fabric_pb";

export function getTierString(
  tier = SubscriptionTier.SUBSCRIPTION_TIER_UNSPECIFIED,
) {
  switch (tier) {
    case SubscriptionTier.SUBSCRIPTION_TIER_UNSPECIFIED:
      return undefined;
    case SubscriptionTier.HOBBY:
      return "Hobby";
    case SubscriptionTier.PERSONAL:
      return "Personal";
    case SubscriptionTier.PRO:
      return "Pro";
    case SubscriptionTier.TEAM:
      return "Team";
    // case SubscriptionTier.ENTERPRISE:
    //   return "Enterprise";
  }
}
