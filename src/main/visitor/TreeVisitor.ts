import VisitContext from "./VisitContext";
import {VisitResult} from "./VisitResult";

export default abstract class TreeVisitor {

  abstract preVisitInternal(context: VisitContext): VisitResult
  abstract postVisitInternal(context: VisitContext): VisitResult
  abstract visitExternal(context: VisitContext): VisitResult
  abstract visitFailure(context: VisitContext, err: any): VisitResult
}