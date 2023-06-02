export const DetailsButtonModal = ({ lines, summary }) => {
  const implementationArray = lines.filter((element) => element.implementation);
  const caseArray = lines.filter((element) => element.case);

  // console.log(implementationArray)
  // console.log(caseArray)
  function TestStatus(implementationImage) {
    let testStatus;
    implementationArray.forEach((seqImplementation) => {
      if (seqImplementation.implementation === implementationImage) {
        // var caseResults = [];
        if (seqImplementation.results) {
          var caseResults = seqImplementation.results.filter(
            (element) => element.skipped
          );
          // console.log(caseResults)
          if (caseResults.length > 0 || seqImplementation.skipped) {
            let seq = seqImplementation.seq;
            caseArray.forEach((seqCase) => {
              if (seqCase.seq === seq) {
                testStatus = "skipped";
              }
            });
          }
        }
      }
    });
    return testStatus;
  }

  return (
    <>
      {summary.implementations.map((implementation, index) => {
        const testStatus = TestStatus(implementation.image);
        console.log(implementation.image)
        console.log(testStatus);

        return (
          <div
            className="modal fade"
            id={`implementation-${index}-details`}
            tabIndex="-1"
            aria-labelledby={`implementation-${index}-details-label`}
            aria-hidden="true"
            key={index}
          >
            <div className="modal-dialog modal-fullscreen">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5"
                    id={`implementation-${index}-details-label`}
                  >
                    <b>{implementation.name + " "}</b>
                    <small className="text-muted">
                      {implementation.language}
                    </small>
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row row-cols-1 row-cols-md-2 g-4">
                    {caseArray.map((eachCase, index) => {
                      const seq = eachCase.seq;
                      const description = eachCase.case.description;
                      const schema = eachCase.case.schema;
                      const registry = eachCase.case.registry;
                      const results = eachCase.case.tests.map((test) => [
                        test,
                        {},
                      ]);

                      return results.map(([test, testResult]) => {
                        if (testStatus === "skipped") {
                          return (
                            <div className="col" key={seq}>
                              <div className="card border-warning mb-3">
                                <div className="card-body">
                                  <h5 className="card-title">
                                    aaaa{description}
                                  </h5>
                                  <p className="card-text">
                                    bbbb{test.description}
                                  </p>
                                </div>
                                <div className="card-footer text-muted text-center">
                                  {/* {implementation_result} */} Result
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      });
                    })}
                    {/* {summary
                    .flat_results()
                    .map(([seq, description, schema, registry, results]) =>
                      results.map(([test, test_results]) => {
                        const [implementation_result, incorrect] =
                          test_results.get(
                            implementation.image,
                            ({ valid: null }, true)
                          );

                        if (incorrect === "skipped") {
                          return (
                            <div className="col" key={seq}>
                              <div className="card border-warning mb-3">
                                <div className="card-body">
                                  <h5 className="card-title">{description}</h5>
                                  <p className="card-text">
                                    {test.description}
                                  </p>
                                </div>
                                <div className="card-footer text-muted text-center">
                                  {implementation_result}
                                </div>
                              </div>
                            </div>
                          );
                        } else if (incorrect === "errored") {
                          return (
                            <div className="col" key={seq}>
                              <div className="card border-danger mb-3">
                                <div className="card-body">
                                  <h5 className="card-title">{description}</h5>
                                  <p className="card-text">
                                    {test.description}
                                  </p>
                                </div>
                                <div className="card-footer text-muted text-center">
                                  {implementation_result}
                                </div>
                              </div>
                            </div>
                          );
                        } else if (incorrect) {
                          return (
                            <div className="col" key={seq}>
                              <div className="card border-danger mb-3">
                                <div className="card-body">
                                  <h5 className="card-title">{description}</h5>
                                  <p className="card-text">
                                    {test.description}
                                  </p>
                                </div>
                                <div className="card-footer text-muted text-center">
                                  Unexpectedly{" "}
                                  {implementation_result.valid === true
                                    ? "valid"
                                    : implementation_result.valid === false
                                    ? "invalid"
                                    : "errored"}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })
                    )} */}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
