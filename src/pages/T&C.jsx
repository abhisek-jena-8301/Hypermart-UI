const TermsAndConditions = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-auto">
        <div className="pt-6">
          <h2 className="text-3xl text-center font-extralight">
            Terms and Conditions
          </h2>
        </div>
        <hr className="text-gray-200 mt-6 mb-1" />
        <div className="flex justify-center items-center">
          <p className="w-3/4 mt-4 text-justify text-gray-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in
            varius sem. Praesent a lectus <b>Tu idhar bhi aa gaya</b> quis eget
            urna. Nullam hendrerit hendrerit enim, vitae venenatis orci
            efficitur quis. Aliquam imperdiet pellentesque felis et fermentum.
            Sed a ultricies risus. Donec porttitor arcu nec magna sollicitudin
            lobortis. Ut in sapien vel ex ultrices viverra. Nam ac ligula
            accumsan augue luctus egestas. Donec tortor massa, porta non auctor
            in, luctus ut urna. Aliquam ut maximus urna. Proin sed consectetur
            ipsum. Mauris id magna vestibulum, aliquam nisl nec, rhoncus neque.
            Maecenas suscipit vulputate ante quis consequat. Integer imperdiet
            vehicula est, vel lacinia neque efficitur vitae. Nam sed tincidunt
            libero. Vivamus ac quam lectus. Sed finibus neque quis nibh finibus
            porta. Nunc erat ex, aliquet tempus egestas sed, fermentum sed nunc.
            Nullam efficitur, mauris a blandit accumsan, dui libero porttitor
            massa, sit amet aliquam urna lorem.
          </p>
        </div>
        <div className="text-lg text-center mb-4 mt-8">
          Back to the
          <a href="/register" className="text-blue-500 ml-1">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
