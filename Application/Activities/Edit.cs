using MediatR;
using AutoMapper;
using FluentValidation;
//project namespaces
using Domain;
using Persistence;
using Application.Core;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _ctx;
            private readonly IMapper _mapper;
            public Handler(DataContext ctx, IMapper mapper)
            {
                _mapper = mapper;
                _ctx = ctx;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _ctx.Activities.FindAsync(request.Activity.Id);

                if (activity == null) return null;

                _mapper.Map(request.Activity, activity);

                var result = await _ctx.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to edit the activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}