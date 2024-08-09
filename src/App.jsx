import TodoListv2 from "./TodoList/TodoListv2"
import { AppState } from "../provider/AppState"
import { Box } from "@mui/material"
import { AuthProvider } from '../provider/AuthState';


function App() {
  return (<>
    <AppState>
      <AuthProvider>
        <Box sx={{ display: "flex" }}>
          <TodoListv2 />
        </Box>
      </AuthProvider>
    </AppState >
  </>
  )
}

export default App
