import React, { PropsWithChildren } from "react";
import { Sound } from "freesound-client";
import Text from "@/prototypes/kick-ass-cards/components/content/Text";

export type SoundResultProps = PropsWithChildren & { sound: Partial<Sound> };

export default function SoundResult({ children, sound }: SoundResultProps) {
    return (
        <div className="SoundResult flex flex-row gap-4 items-center">
            <div className="flex flex-row gap-2">
                <div className="">{sound.images?.waveform_m && <img src={sound.images?.waveform_m} alt="" />}</div>
                <div className="flex-1 flex flex-col gap-2">
                    {sound.name && (
                        <Text className="font-bold">
                            {sound.name} ({sound.id})
                        </Text>
                    )}
                    {sound.previews?.["preview-lq-mp3"] && (
                        <audio src={sound.previews["preview-lq-mp3"]} controls={true} />
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}
