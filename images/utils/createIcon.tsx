import { ForwardRefRenderFunction, SVGProps, forwardRef } from "react";

export const createIcon = (cb: ForwardRefRenderFunction<SVGSVGElement, SVGProps<SVGSVGElement>>) => forwardRef(cb);