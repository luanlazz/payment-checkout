import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ROOT } from './constants'
import { Store } from '@/pages'
import { LinearProgress } from '@material-ui/core'

const RouterConfig: React.FC = () => (
  <div>
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route exact path={ROOT} component={Store} />
      </Switch>
    </Suspense>
  </div>
)

export default RouterConfig
