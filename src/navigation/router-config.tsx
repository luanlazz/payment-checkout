import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ROOT, SUCCESS } from './constants'
import { Header } from '@/components'
import { Store, Success } from '@/pages'
import { LinearProgress } from '@material-ui/core'

const RouterConfig: React.FC = () => (
  <>
    <Header />
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route exact path={ROOT} component={Store} />
        <Route path={SUCCESS} component={Success} />
      </Switch>
    </Suspense>
  </>
)

export default RouterConfig
