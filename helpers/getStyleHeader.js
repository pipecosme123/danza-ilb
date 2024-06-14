import { ATTENDANCE } from "../constants"

export default getStyleHeader = (type) => {
  switch (type) {
    case ATTENDANCE.ASISTENCIA:
      return {
        bg: {
          color: "success.200",
          icon: "success.700"
        },
        icon: {
          name: "check",
          color: "success.700"
        }
      }

    case ATTENDANCE.EXCUSA:
      return {
        bg: {
          color: "warning.200",
          icon: "warning.700"
        },
        icon: {
          name: "file-document-edit-outline",
          color: "warning.700"
        }
      }

    case ATTENDANCE.INASISTENCIA:
      return {
        bg: {
          color: "error.200",
          icon: "error.700"
        },
        icon: {
          name: "close",
          color: "error.700"
        }
      }

    default:
      return {
        bg: {
          color: "muted.200",
          icon: "muted.700"
        },
        icon: {
          name: "browser-not-supported",
          color: "muted.700"
        }
      }
  }
}