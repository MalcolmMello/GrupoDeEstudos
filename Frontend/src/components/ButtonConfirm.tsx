import * as AlertDialog from '@radix-ui/react-alert-dialog';

const ButtonConfirm = () => {

  function onSubmit(){
    window.alert("Reunião Marcada com Sucesso");
  }

  return(
    <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <button className="bg-gray-700 text-white font-medium px-4 py-2 rounded-lg">
        Marcar
      </button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-50 p-[25px] shadow focus:outline-none">
        <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          Marcar Reunião
        </AlertDialog.Title>
        <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
          Você realmente deseja se inscrever nessa reunião?
        </AlertDialog.Description>
        <div className="flex items-center justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className="font-medium bg-gray-700 border-2 border-gray-700 p-2 rounded-lg text-white hover:bg-white hover:text-black">
              Cancelar
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button 
              className="font-medium border-2 border-gray-700 py-2 px-4 rounded-lg hover:bg-gray-700 hover:text-white"
              onClick={onSubmit}
              >
              Marcar
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
  )
};
export default ButtonConfirm;