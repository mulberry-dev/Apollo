const tealButtonColor = () =>
  getComputedStyle(document.body).getPropertyValue("--color-teal").trim() ||
  "#2dd4bf"

export async function PrivateDeployment(
  params: string,
  copy?: { privateTitle: string; privateText: string; privateConfirm: string }
) {
  if (!params) {
    return
  }

  const { default: Swal } = await import("sweetalert2")
  const title = copy?.privateTitle ?? "This deployment is private"
  const text =
    copy?.privateText ??
    "If you want to know more about this project, please contact me."
  const confirm = copy?.privateConfirm ?? "Great!"

  Swal.fire({
    icon: "info",
    title: `${title}: <br/> <span>${params} <span/> <br/>  🔒 `,
    text,
    focusConfirm: false,
    confirmButtonText: confirm,
    confirmButtonAriaLabel: confirm,
    confirmButtonColor: tealButtonColor()
  })
}

export async function SiteOffline(
  name: string,
  copy?: { offlineTitle: string; offlineText: string; privateConfirm: string }
) {
  if (!name) {
    return
  }

  const { default: Swal } = await import("sweetalert2")
  const title = copy?.offlineTitle ?? "This site is offline"
  const text =
    copy?.offlineText ?? "The live deployment is not available right now."
  const confirm = copy?.privateConfirm ?? "Great!"

  Swal.fire({
    icon: "warning",
    title: `${title}: <br/> <span>${name}</span>`,
    text,
    focusConfirm: false,
    confirmButtonText: confirm,
    confirmButtonAriaLabel: confirm,
    confirmButtonColor: tealButtonColor()
  })
}

export async function ConfirmLeaveSite(copy?: {
  leaveTitle: string
  leaveText: string
  leaveStay: string
  leaveGo: string
}) {
  const { default: Swal } = await import("sweetalert2")
  const title = copy?.leaveTitle ?? "This will take you to another page"
  const text =
    copy?.leaveText ?? "Are you sure you want to leave mulberry-dev?"
  const stay = copy?.leaveStay ?? "Stay"
  const leave = copy?.leaveGo ?? "Leave"

  const result = await Swal.fire({
    icon: "question",
    title,
    text,
    showCancelButton: true,
    focusCancel: true,
    confirmButtonText: leave,
    confirmButtonAriaLabel: leave,
    cancelButtonText: stay,
    cancelButtonAriaLabel: stay,
    confirmButtonColor: tealButtonColor(),
    reverseButtons: true
  })

  return result.isConfirmed
}
