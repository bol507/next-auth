
import { CardWrapper } from "@/components/auth/card-wrapper"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"


export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! something went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex flex-col items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>  
    </CardWrapper>
  )
}