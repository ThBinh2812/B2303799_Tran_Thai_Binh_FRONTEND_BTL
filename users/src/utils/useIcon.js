import { h } from 'vue'
import { NIcon } from 'naive-ui'

const useIcon = (className, size = '16px') => {
  return h(
    NIcon,
    {
      style: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    {
      default: () =>
        h('i', {
          class: className,
          size: size,
        }
      ),
    },
  )
}

export { useIcon }
