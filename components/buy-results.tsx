import { BuyNowButton } from './buy-now-button';

export function BuyResults(props: { id: string }) {
  return (
    <section className="container mx-auto px-2 py-16 flex flex-col items-center text-center gap-4">
      <h1 className="text-xl font-bold">Your IQ Test Results are ready</h1>
      <p>
        Unlock for only <span className="text-secondary">€1</span> and get
        access to your personalized report.
      </p>

      <div className="flex gap-2">
        <div className="flex flex-col items-center bg-base-100 shadow-sm p-2 w-full">
          <h3 className="text-secondary">IQ 113</h3>
          <div>
            <p className="mb-1">Howard Stern</p>
            <img
              className="rounded"
              src="/howard-stern.jpg"
              alt="Howard Stern"
            />
          </div>
        </div>

        <div className="flex flex-col items-center bg-base-100 shadow-sm p-2 w-full">
          <h3 className="text-secondary">IQ ???</h3>
          <div>
            <p className="mb-1">You</p>
            <img className="rounded-full" src="/placeholder.jpg" alt="" />
          </div>
        </div>

        <div className="flex flex-col items-center bg-base-100 shadow-sm p-2 w-full">
          <h3 className="text-secondary">IQ 162</h3>
          <div>
            <p className="mb-1">Elon Musk</p>
            <img className="rounded" src="/elon-musk.jpg" alt="Elon Musk" />
          </div>
        </div>
      </div>

      <BuyNowButton
        className="btn btn-neutral w-full btn-lg"
        text="Get My IQ Certificate Now! €1"
        quizId={props.id}
      />
    </section>
  );
}
