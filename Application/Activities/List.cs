using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
//project namespaces
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly DataContext _ctx;
            private readonly IMapper _mapper;
            public Handler(DataContext ctx, IMapper mapper)
            {
                _mapper = mapper;
                _ctx = ctx;
            }

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _ctx.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<ActivityDto>>.Success(activities);
            }
        }
    }
}