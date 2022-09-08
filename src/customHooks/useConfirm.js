import { useState } from "react";

const createPromise = () => {
  let resolver;
  return [
    new Promise((resolve, reject) => {
      resolver = resolve;
    }),
    resolver,
  ];
};

const useConfirm = () => {
  const [open, setOpen] = useState(false);
  const [resolver, setResolver] = useState({ resolver: null });

  const getConfirmation = async () => {
    setOpen(true);
    const [promise, resolve] = await createPromise();
    setResolver(resolve);
    return promise;
  };

  const onClick = async (status) => {
    setOpen(false);
    resolver.resolve(status);
  };
};
