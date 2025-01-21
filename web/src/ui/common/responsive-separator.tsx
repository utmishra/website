import { Separator } from '@radix-ui/themes'

export const ResponsiveSeparator = () => (
  <Separator
    size="2"
    orientation={{
      initial: 'vertical',
      lg: 'vertical',
      xl: 'vertical',
      md: 'vertical',
      xs: 'horizontal',
      sm: 'horizontal',
    }}
    className="sm-hidden xs-hidden"
  ></Separator>
)
