export function getUserRole(user) {
  if (!user) return "patient";
  if (user.publicMetadata?.role) {
    return user.publicMetadata.role.toLowerCase();
  }

  if (user.privateMetadata?.role) {
    return user.privateMetadata.role.toLowerCase();
  }
  const email =
    user?.emailAddresses?.[0]?.emailAddress ||
    user?.primaryEmailAddress?.emailAddress;

  if (email?.includes("practitioner")) return "practitioner";
  if (email?.includes("patient")) return "patient";
  return "patient";
}
