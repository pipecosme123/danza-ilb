import { ATTENDANCE } from "../constants"

export default getStyleHeader = (type) => {
  switch (type) {
    case ATTENDANCE.ASISTENCIA:
      return {
        name: ATTENDANCE.ASISTENCIA,
        bg: {
          color: "success.200",
          icon: "success.700"
        },
        icon: {
          name: "check",
          color: "success.700",
          hex: "#15803d"
        }
      }

    case ATTENDANCE.EXCUSA:
      return {
        name: ATTENDANCE.EXCUSA,
        bg: {
          color: "warning.200",
          icon: "warning.700",
          hex: "#c2410c"
        },
        icon: {
          name: "file-document-edit-outline",
          color: "warning.700",
          hex: "#c2410c"
        }
      }

    case ATTENDANCE.INASISTENCIA:
      return {
        name: ATTENDANCE.INASISTENCIA,
        bg: {
          color: "error.200",
          icon: "error.700"
        },
        icon: {
          name: "close",
          color: "error.700",
          hex: "#b91c1c"
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
          color: "muted.700",
          hex: "#404040"
        }
      }
  }
}