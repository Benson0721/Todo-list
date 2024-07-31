import TodoListv2 from "./TodoList/TodoListv2"
import { AppState } from "../provider/AppState"
import { Box } from "@mui/material"



function App() {
  return (<>
    <AppState>
      <Box sx={{ display: "flex" }}>
        <TodoListv2 />
      </Box>
    </AppState >
  </>
  )
}

export default App
