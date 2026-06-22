/* hooks */
import { useDirectMessage } from "../hooks/useDirectMessage"
/* components */
import RetroButton from "./RetroPixelUI/RetroButton"
import RetroInput from "./RetroPixelUI/RetroInput"

interface DirectMessageModalProps {
    onClose: () => void
}

const DirectMessageModal = ({ onClose }: DirectMessageModalProps) => {
    const { formRef, sendMessage, alert } = useDirectMessage()

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Backdrop */}
            <div onClick={onClose}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                style={{
                    backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px),
            repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px)
          `
                }}
            ></div>

            <div className="relative z-10 w-[90%] max-w-lg sm:max-w-xl">
                {alert && (
                    <div className="font-bold text-center text-green-500 animate-bounce" style={{ textShadow: '4px 4px 0 rgba(0,0,0,1)' }}>{alert.message}</div>
                )}

                <form id="fillup" ref={formRef} onSubmit={sendMessage}>
                    <div className="flex flex-col gap-2">
                        <span className='text-white'>&gt; Name</span>
                        <RetroInput tagsType="input" type="text" id="opname" name="from_name" placeholder="your name..." required />
                        <span className='text-white'>&gt; Email</span>
                        <RetroInput tagsType='input' type="text" id="gmail" name="from_email" placeholder="your email..." required />
                        <span className='text-white'>&gt; Message</span>
                        <RetroInput tagsType='textarea' name="message" rows={5} cols={50} id="message" className='input3' placeholder="your message..." required />
                        <div className="flex items-center justify-end mt-3">
                            <RetroButton color="red" value="send">
                                [ SEND ]
                            </RetroButton>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default DirectMessageModal