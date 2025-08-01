import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  itemName?: string;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  itemName = "data ini",
}) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in"
        />
        <AlertDialog.Content
          className="fixed z-50 top-[50%] left-[50%] w-full max-w-sm translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-6 shadow-lg
          data-[state=open]:animate-in data-[state=open]:fade-in-90 data-[state=open]:zoom-in-95
          data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95
          transition duration-300"
        >
          <AlertDialog.Title className="text-lg font-semibold text-gray-900">
            Hapus {itemName}?
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm text-gray-600">
            Tindakan ini tidak dapat dibatalkan. Yakin ingin menghapus <strong>{itemName}</strong>?
          </AlertDialog.Description>

          <div className="mt-6 flex justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <button className="px-4 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200">
                Batal
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={() => {
                  onConfirm();
                  onOpenChange(false);
                }}
                className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
              >
                Hapus
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ConfirmDeleteDialog;
