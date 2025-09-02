import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import Homepage from "@/components/pages/Homepage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Layout>
<Routes>
            <Route path="/" element={
              <Layout>
                {({ searchQuery, selectedCategory }) => (
                  <Homepage 
                    searchQuery={searchQuery} 
                    selectedCategory={selectedCategory}
                  />
                )}
              </Layout>
            } />
            <Route path="/products" element={
              <Layout>
                {({ searchQuery, selectedCategory }) => (
                  <Homepage 
                    searchQuery={searchQuery} 
                    selectedCategory={selectedCategory}
                  />
                )}
              </Layout>
            } />
            <Route path="/categories" element={
              <Layout>
                {({ searchQuery, selectedCategory }) => (
                  <Homepage 
                    searchQuery={searchQuery} 
                    selectedCategory={selectedCategory}
                  />
                )}
              </Layout>
            } />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;