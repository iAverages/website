import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as TooltipPrimitive from "@kobalte/core/tooltip";
import type { ValidComponent } from "solid-js";
import { type Component, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

const TooltipTrigger = TooltipPrimitive.Trigger;

const Tooltip: Component<TooltipPrimitive.TooltipRootProps> = (props) => {
	return <TooltipPrimitive.Root gutter={4} {...props} />;
};

type TooltipContentProps<T extends ValidComponent = "div"> =
	TooltipPrimitive.TooltipContentProps<T> & { class?: string | undefined };

const TooltipContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, TooltipContentProps<T>>,
) => {
	const [local, others] = splitProps(props as TooltipContentProps, ["class"]);
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Content
				class={cn(
					"tooltip z-50 origin-[var(--kb-popover-content-transform-origin)] rounded-md px-3 py-1.5 text-xs text-balance bg-popover text-popover-foreground",
					local.class,
				)}
				{...others}
			/>
		</TooltipPrimitive.Portal>
	);
};

export { Tooltip, TooltipTrigger, TooltipContent };
