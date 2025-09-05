import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

function App() {
  return (
    <div className="p-8 space-y-12">
      <h1 className="text-2xl font-bold text-center">React Form Handling</h1>

      {/* Controlled Component Form */}
      <RegistrationForm />

      {/* Formik Form */}
      <FormikForm />
    </div>
  );
}

export default App;
