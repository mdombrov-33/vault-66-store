function SpecialRegisterHeader() {
  return (
    <div className="flex flex-col items-center text-center gap-2 px-4">
      <h2 className="md:text-5xl text-3xl -mt-6">
        Welcome to Your S.P.E.C.I.A.L. Profile
      </h2>

      <p className="text-base text-muted-foreground sm:text-lg md:text-xl lg:text-lg max-w-xl">
        Out here, everyone plays a part. Set your S.P.E.C.I.A.L. stats to unlock
        the G.O.A.T. Test and find your place in Vault 66’s trading network.
      </p>

      <h3 className="text-8xl">21</h3>
      <p className="text-2xl uppercase text-muted-foreground">
        points available
      </p>
    </div>
  );
}

export default SpecialRegisterHeader;
